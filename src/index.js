import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {

	constructor(props) {
    	super(props);
    	this.state = {
    		  error: null,
      		isLoaded: false,
          showEditForm: false,
      		item: [],
          id: '',
          name: '',
          email: '',
          course: ''
    	};
    	this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleUpdate = this.handleUpdate.bind(this);
      this.toggleShowEditForm = this.toggleShowEditForm.bind(this);
  	}

  	componentDidMount() {
  		fetch("http://localhost:8080/learners")
  		.then(res => res.json())
    	.then(
    		(result) => {
    			this.setState({
            		isLoaded: true,
            		item: result
          		});
        	},
        	(error) => {
          		this.setState({
          			isLoaded: true,
            		error
          		});
        	}
   		)
    }

    handleSubmit(event) {
        event.preventDefault();
        let { item } = this.state;
        var component = this;
        var data = {
            learner_id: "0",
            learner_name: this.state.name,
            learner_email: this.state.email,
            course_id: this.state.course
        };
        fetch("http://localhost:8080/learners", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(function(response) {
            return response.json();
        }).then(function(result) {
          data.learner_id = result;
          component.setState({item:item.concat(data)});
        }).catch(function(err) {
            console.log(err)
        });
    }

    handleUpdate(event) {
        event.preventDefault();
        var component = this;
        var data = {
              learner_id: this.state.id,
              learner_name: this.state.name,
              learner_email: this.state.email,
              course_id: this.state.course
        };
        fetch("http://localhost:8080/learners", {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(function(response) {
            return response.json();
        }).then(function(result) {
              component.setState(prevState => ({
                item: prevState.item.map(item => item.learner_id === result ?
                {
                  learner_id: data.learner_id,
                  learner_name: data.learner_name,
                  learner_email: data.learner_email,
                  course_id: data.course_id
                } : item
              )
              }));
        }).catch(function(err) {
            console.log(err);
        });
    }

    clickedDeleteUser(clickedId) {
        let { item } = this.state;
        const component = this;
        fetch(`http://localhost:8080/learners/${clickedId}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        }).then(function(response) {
            return response.json();
        }).then(function(result) {
          component.setState({ item: item.filter(item => item.learner_id !== clickedId) });
        }).catch(function(err) {
            console.log(err)
        });
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }

    toggleShowEditForm(clickedId) {
      this.setState({ showEditForm: true, id: clickedId });
    }

  	render() {
    	const { error, isLoaded, item, showEditForm } = this.state;
    	if (error) {
      		return <div>Error: {error.message}</div>;
    	} else if (!isLoaded) {
      		return <div>Loading...</div>
    	} else {
      		return (
      			<div>

            <h2>Sign up for Classes</h2>

            <form onSubmit={this.handleSubmit}>
              <input type="text" placeholder="Name" name="name" onChange={this.handleChange}/>
              <input type="text" placeholder="Email" name="email" onChange={this.handleChange}/>
              <input type="text" placeholder="Course" name="course" onChange={this.handleChange}/>
              <input type="submit" value="Submit" />
              <input type="reset" value="Reset" />
            </form>

            <h2>Current Students</h2>

            {item.map(item => (
                <div key={item.learner_id}>
                <p>
                  Name: {item.learner_name}
                  <br />
                  Email: {item.learner_email}
                  <br />
                  Course Number: {item.course_id}
                </p>

                <button onClick= {() => this.toggleShowEditForm(item.learner_id)}> Edit </button>
                <button onClick={() => this.clickedDeleteUser(item.learner_id)}> Delete </button>

                {showEditForm && this.state.id === item.learner_id ?
                  (<form onSubmit={this.handleUpdate}>Edit User:
                    <input type="text" placeholder="Name" name="name" onChange={this.handleChange}/>
                    <input type="text" placeholder="Email" name="email" onChange={this.handleChange}/>
                    <input type="text" placeholder="Course" name="course" onChange={this.handleChange}/>
                    <input type="submit" value="Edit" />
                    <input type="reset" value="Reset" />
                  </form>) : null
                }

                </div>
              ))}

      			</div>
      	);
    	}
    }
}

ReactDOM.render(
        <App />,
        document.getElementById('root')
);
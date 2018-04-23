import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createPost } from '../actions'

class PostsNew extends Component {

  renderField(field) {
    const { error, touched } = field.meta;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <p className="text-help">{touched ? error : ''}</p>
      </div>
    )
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/')
    })
  }


  render() {
    const { handleSubmit } = this.props;
    //handleSubmit is redux form part, that gets called and then runs this.onSubmit as the callback,
    //need to bind this because the onSubmit will be ran in another function and we want access to component
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label= "Post Title"
          name = "title"
          component = {this.renderField}
        />
        <Field
          label = "Categories"
          name = "categories"
          component = {this.renderField}
        />
        <Field
          label = "Post Content"
          name = "content"
          component = {this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    )
  }
}

function validate(values) {
  const errors = {}
  //validate inputs from 'values' object
  if (!values.title) {
    errors.title = "Enter a Title";
  }
  if (!values.categories) {
    errors.categories = "Enter a category";
  }
  if (!values.content) {
    errors.content = "Enter some content";
  }
  //if errors is empty, form is fine to submit
  //if errors has any props, assumes invalid, wont submit
  return errors
}

export default reduxForm({
  validate,
  form: 'PostsNewForm' //name of the form, has to be unique
})(
  connect(null, { createPost })(PostsNew)
)

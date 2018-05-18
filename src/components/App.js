import React, {Component} from 'react';
import {auth} from '../firebase';
import {db} from '../firebase';

class App extends Component {
  constructor() {
    super();
    this.state = {
      error: '',
      user: JSON.parse(localStorage.getItem('user')),
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken'),
      quote: {
        content: '',
        author: 'Unknown',
      },
    };

    this.signInWithGoogle = this.signInWithGoogle.bind(this);
    this.signOut = this.signOut.bind(this);
    this.submitCreateQuote = this.submitCreateQuote.bind(this);
    this.changeQuoteValue = this.changeQuoteValue.bind(this);
  }

  signInWithGoogle() {
    auth
      .signInWithGoogle()
      .then(result => {
        const accessToken = result.credential.accessToken;
        const refreshToken = result.user.refreshToken;
        const user = {
          email: result.user.email,
          name: result.user.displayName,
          avatar: result.user.photoURL,
        };

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        this.setState({
          error: '',
          user,
          accessToken,
          refreshToken,
        });
      })
      .catch(error => this.setState({error: error.message}));
  }

  changeQuoteValue(e) {
    const target = e.target;
    const newQuote = {
      [target.name]: target.value,
    };
    this.setState(prev => {
      return Object.assign(prev.quote, newQuote);
    });
  }

  submitCreateQuote(e) {
    e.preventDefault();
    const {content, author} = this.state.quote;
    db.createQuote(content, author).then(error => {
      if (error) {
        this.setState({error});
      } else {
        this.setState({
          quote: {
            content: '',
            author: 'Unknown',
          },
        });
      }
    });
  }

  signOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    this.setState({
      error: '',
      user: null,
      accessToken: null,
      refreshToken: null,
    });
  }

  renderError() {
    return <span className="error">Error: {this.state.error}</span>;
  }

  render() {
    if (this.state.error) {
      this.renderError();
    }

    if (!this.state.user) {
      return (
        <div>
          <button onClick={this.signInWithGoogle}>Sign in with Google</button>
        </div>
      );
    }

    return (
      <div>
        <div>
          Hello {this.state.user.name} &lt;{this.state.user.email}&gt;
        </div>
        <div>
          <button onClick={this.signOut}>Log out</button>
        </div>
        <hr />
        <form onSubmit={this.submitCreateQuote}>
          <input
            type="text"
            name="content"
            onChange={this.changeQuoteValue}
            value={this.state.quote.content}
          />
          <input
            type="text"
            name="author"
            onChange={this.changeQuoteValue}
            value={this.state.quote.author}
          />
          <input type="submit" value="Create" />
        </form>
      </div>
    );
  }
}

export default App;

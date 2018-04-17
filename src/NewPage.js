import React from 'react';
import CommentForm, { ReplyStyledTextArea, StyledReplyForm } from './CommentForm';
import IdentityAvatar from './Avatar';
import { createRoboHash } from './entityApi';
import WithRouter from './WithRouter';

const PLACEHOLDER = 'Your RoboHash';

export default class NewPage extends React.Component {
  state = {
    value: ''
  };

  onInputChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <div className="container" style={{ paddingTop: '30px' }}>
        <div className="columns">
          <div className="column is-4 is-offset-4 has-text-centered">
            <IdentityAvatar
              size="veryLarge"
              src={`http://robohash.org/${this.state.value || PLACEHOLDER}.png`}
              style={{ display: 'flex', justifyContent: 'center' }}
            />
            <h2 style={{ fontSize: '2rem', marginTop: '20px' }}>Create your own RoboHash</h2>
            <WithRouter>
              {({ history }) => (
                <CommentForm
                  TextArea={ReplyStyledTextArea}
                  Form={StyledReplyForm}
                  onChange={this.onInputChange}
                  sendMessage={async name => {
                    await createRoboHash(name);
                    history.push('/');
                  }}
                  placeholder={PLACEHOLDER}
                />
              )}
            </WithRouter>
          </div>
        </div>
      </div>
    );
  }
}

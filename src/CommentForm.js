import React from 'react';
import TextArea from 'react-autosize-textarea';
import styled, { css } from 'styled-components';
import Context from './Context';
import Metamask from './img/metamask.png';
import TranslationsContext from './Translations';

export const Form = styled.form`
  position: relative;
  display: flex;
`;


export const StyledReplyForm = styled(Form)`
  background-color: rgba(246, 244, 255, 0.7);
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  align-items: center;
`;

export const StyledTextArea = styled(TextArea)`
  background: transparent;
  font-family: Rubik;
  font-size: 24px;
  font-weight: 500;
  color: #1b2437;
  border: none;
  resize: none;
  width: calc(100% - 60px);
  outline: none;
  overflow: auto;

  &::placeholder {
    transition: color 0.15s ease-in-out;
    color: #1b2437;
  }

  &:-ms-input-placeholder {
    color: #1b2437;
  }

  &::-ms-input-placeholder {
    color: #1b2437;
  }

  &:hover::placeholder,
  &:focus::placeholder {
    color: #928f9b;
  }

  &:hover:-ms-input-placeholder,
  &:focus:-ms-input-placeholder {
    color: #928f9b;
  }

  &:hover::-ms-input-placeholder,
  &:focus::-ms-input-placeholder {
    color: #928f9b;
  }
`;

export const ReplyStyledTextArea = styled(StyledTextArea)`
  font-size: 16px;
  font-weight: normal;

  &::placeholder {
    font-weight: 500;
    color: #623cea;
  }

  &:-ms-input-placeholder {
    font-weight: 500;
    color: #623cea;
  }

  &::-ms-input-placeholder {
    font-weight: 500;
    color: #623cea;
  }
`;

const MetamaskButton = styled.button`
  position: absolute;
  right: 10px;
  bottom: 5px;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  outline: none;
  border: none;
  transition: all 0.15s ease-in-out;
  background: transparent url(${Metamask});
  background-position: 50% 50%;
  background-size: 50%;
  background-repeat: no-repeat;
  ${({ disabled }) =>
    disabled
      ? css`
          opacity: 0.7;
        `
      : css`
          opacity: 1;
          box-shadow: 0 3px 10px rgba(98, 60, 234, 0.2);
          cursor: pointer;
          &:hover,
          &:focus {
            box-shadow: 0 3px 6px rgba(98, 60, 234, 0.4);
          }
        `};
`;

export default class CommentForm extends React.Component {
  state = {
    comment: ''
  };

  submitForm = async () => {
    await this.props.sendMessage(this.state.comment);
    this.setState({ comment: '' });
    this.props.onSubmit && this.props.onSubmit();
  };

  render() {
    const FormComponent = this.props.Form || Form;
    const TextAreaComponent = this.props.TextArea || StyledTextArea;
    return (
      <FormComponent
        onSubmit={e => {
          e.preventDefault();
          this.submitForm();
        }}
      >
        <TextAreaComponent
          placeholder={this.props.placeholder}
          value={this.state.comment}
          onChange={e => this.setState({ comment: e.target.value })}
          onKeyPress={e => e.key === 'Enter' && e.ctrlKey && this.submitForm()}
        />
        <MetamaskButton disabled={!this.state.comment} type="submit" />
      </FormComponent>
    );
  }
}

export const ConnectedCommentForm = props => (
  <Context.Consumer>
    {({ feedStore: { sendMessage } }) => (
      <TranslationsContext.Consumer>
        {({ commentPlaceholder }) => (
          <CommentForm sendMessage={sendMessage} placeholder={commentPlaceholder} {...props} />
        )}
      </TranslationsContext.Consumer>
    )}
  </Context.Consumer>
);

export const ConnectedReplyForm = ({ about, ...props }) => (
  <Context.Consumer>
    {({ feedStore: { reply } }) => (
      <TranslationsContext.Consumer>
        {({ replyPlaceholder }) => (
          <CommentForm sendMessage={message => reply(message, about)} placeholder={replyPlaceholder} {...props} />
        )}
      </TranslationsContext.Consumer>
    )}
  </Context.Consumer>
);

export const ConnectedLabelForm = ({ labelType, ...props }) => (
  <Context.Consumer>
    {({ feedStore: { label } }) => (
      <CommentForm
        sendMessage={message => label(message, labelType)}
        placeholder={`Set your ${labelType}`}
        {...props}
      />
    )}
  </Context.Consumer>
);

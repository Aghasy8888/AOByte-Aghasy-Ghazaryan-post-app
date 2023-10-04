import React from 'react'
import SingleComment from './SingleComment'

export default function SingleReply({reply, post, replyBool}) {
  return (
    <div>
      <SingleComment comment={reply} post={post} replyBool={replyBool}/>
    </div>
  )
}

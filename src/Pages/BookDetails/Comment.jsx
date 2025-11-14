import React from 'react';

const Comment = ({comment}) => 
  {
    console.log(comment)
  return (
    <div>
      <div className="overflow-x-auto">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src={comment.user_image}
                                alt={"user"}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{comment.user_name}</div>
                            <div className="text-sm opacity-50">
                              {comment.created_at}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        Comment
                        <br />
                        <span className="badge badge-ghost badge-sm">
                          {comment.comment}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
    </div>
  );
};

export default Comment;
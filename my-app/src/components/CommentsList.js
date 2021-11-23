const CommentsList = (props) => {
  const { comments } = props;

  const arrayComments = comments.map((comment, index) => (
    <p className="entry" key={`comment_${index}`}>{comment.commentary}</p>
  ));

  return <ul className="commentaries">{arrayComments}</ul>;
};

export default CommentsList;

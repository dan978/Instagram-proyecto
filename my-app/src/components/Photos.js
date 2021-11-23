
import ImageBody from './ImageBody';

const Photos = (props) => {
  const { id, userId, userName, img, description, date } = props;

  return (
    <div className="img">
      <ImageBody id={id} userId={userId} userName={userName} content={description} date={date} img={img}></ImageBody>
    </div>
  );
};

export default Photos;
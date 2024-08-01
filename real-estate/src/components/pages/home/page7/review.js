import * as Icon from "react-bootstrap-icons";
import img_m_1 from "./img/main-photo-1.png";
import img_m_2 from "./img/main-photo-1.png";
import img_m_3 from "./img/main-photo-1.png";

const review = [
  {
    id: "1",
    image: img_m_1 ,
    name: "Lennie Swiffan",
    comment:
      "Smooth interface, thorough search, insightful market data highly recommended!",
    place: "Bedi",
  },
  {
    id: "2",
    image: img_m_2 ,
    name: "Tiana Abie",
    comment:
      "Intuitive design, comprehensive search, expert insights a top-notch platform!",
    place: "Rajkot",
  },
  {
    id: "3",
    image:img_m_3 ,
    name: "Berta Emili",
    comment:
      "Streamlined design, comprehensive search, insightful market analysis. Highly recommended!",
    place: "Bedi",
  },
];

const Comment = review.map((e) => {
  return (
    <div className="box-7" key={e.id}>
      <img src={e.image} alt="" className="img-main-7-1" />
      <h3>{e.comment}</h3>
      <p>{e.name}</p>
      <span>
        <Icon.Geo className="icon-geo-7" />
        {e.place}
      </span>
    </div>
  );
});

export default Comment;

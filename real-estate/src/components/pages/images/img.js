import newYork from "../images/newYourk.jpg";
import singapore from "../images/singapore.jpeg";
import paris from "../images/paris.jpg";
import london from "../images/london.jpg";
import tokyo from "../images/tokyo.jpeg";
import lakshadweep from "../images/lakshadweep.jpeg";

const img = [
  {
    id: "1",
    image: newYork,
    name: "New York",
    number: "188,288",
  },
  {
    id: "2",
    image: singapore,
    name: "Singapore",
    number: "18,288",
  },
  {
    id: "3",
    image: paris,
    name: "Paris",
    number: "298,288",
  },
  {
    id: "4",
    image: london,
    name: "London",
    number: "688,288",
  },
  {
    id: "5",
    image: tokyo,
    name: "Tokyo",
    number: "18,208",
  },
  {
    id: "6",
    image: lakshadweep,
    name: "Lakshadweep",
    number: "8,288",
  },
];

const gallery = img.map((item) => {
  return (
    <div key={item.id} className="image-box-2">
      <div className="image-2">
        <img src={item.image} alt={item.name} className="img-2"/>
      </div>
      <div className="description-2">
        <p>{item.name}</p>
        <span>{item.number} Properties</span>
      </div>
    </div>
  );
});

export default gallery;

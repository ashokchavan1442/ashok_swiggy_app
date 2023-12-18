import {CDN_URL} from "../utils/contants"
const RestaurantCard = (props) => {
  const {resdata}=props;
  const {name,cuisines,avgRating,costForTwo,sla,cloudinaryImageId}=resdata?.info;

  return (
    <div className="w-56 p-4 m-4 shadow-lg bg-pink-50 hover:bg-gray-400 sm:bg-green-100" >
      <img  className="rounded-lg  " src={CDN_URL+ cloudinaryImageId} alt="res-img"/>
      <h3 className="font-bold py-4 text-lg">{name}</h3>
      <h4>{cuisines.join(", ")} </h4>
      <h4>{avgRating} stars</h4>
      <h4>{costForTwo} </h4>
      <h4>{sla.slaString}</h4>
    </div>
  );
};
export default RestaurantCard;
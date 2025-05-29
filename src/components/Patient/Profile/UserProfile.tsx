import { useParams } from "react-router-dom";

export const UserProfile = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};

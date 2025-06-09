import { useState } from "react";

export const ProfileAvatar = ({
  name,
  photoUrl,
}: {
  name: string;
  photoUrl: string;
}) => {
  const [imageError, setImageError] = useState(false);

  const showFallback = imageError || !photoUrl;
  const firstLetter = name?.[0]?.toUpperCase() || "?";

  return showFallback ? (
    <div className="w-24 h-24 rounded-full bg-gray-600 text-white flex items-center justify-center text-3xl font-semibold">
      {firstLetter}
    </div>
  ) : (
    <img
      src={photoUrl}
      alt="Profile"
      onError={() => setImageError(true)}
      className="w-24 h-24 rounded-full object-cover"
    />
  );
};

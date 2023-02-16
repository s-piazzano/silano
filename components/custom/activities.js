import { useRef, useEffect } from "react";

import Card from "../ui/card";

export default function Activities({ className, activities }) {
  return (
    <div
      className={`w-full flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 justify-center items-stretch px-4 -mb-48 ${className}`}
    >
      {activities.map((activity) => (
        <Card
          className="opacity-0 flex-1"
          id={`card-${activity.id}`}
          key={activity.id}
          title={activity.title}
          description={activity.description}
          link={activity.link}
          imageUrl={activity.image?.data?.attributes?.formats?.medium?.url}
        ></Card>
      ))}
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import service from '../appwriter/Config';

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
        <div className="w-full mb-4">
          {featuredImage ? (
            <img
              src={service.getFileUrl(featuredImage)}
              alt={title}
              className="w-full h-48 object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg text-gray-500">
              No Image
            </div>
          )}
        </div>
        <h2 className="text-xl font-bold text-center">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;

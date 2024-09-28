import React from "react";

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & Get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto id
        doloribus voluptate dolores. In quibusdam itaque hic saepe quod, cumque,
        repellat optio atque sint cupiditate earum quasi, exercitationem dolorem
        ex.
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center mt-4"
      >
        <div className="flex w-full max-w-md items-center">
          <input
            className="flex-1 outline-none p-3 border border-gray-300 rounded-l-md"
            type="email"
            placeholder="Enter your email"
            required
          />
          <button
            type="submit"
            className="bg-black text-white text-xs px-6 py-4 rounded-r-md"
          >
            SUBSCRIBE
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsletterBox;

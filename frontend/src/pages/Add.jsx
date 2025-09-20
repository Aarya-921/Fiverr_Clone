import React, { useReducer, useState } from "react";
import { gigReducer, INITIAL_STATE } from "../reducers/gigReducer";
import upload from "./../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import { useNavigate } from "react-router-dom";


const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };
  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);
      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gigs", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    navigate("/mygigs");
  };

  return (
    <div className="flex justify-center">
      <div className="w-[1400px] py-[50px] px-0">
        <h1 className="text-[24px] font-light text-gray-400 mb-[30px]">
          Add New Gig
        </h1>
        <div className="flex justify-between gap-[100px] ">
          <div className="flex flex-col justify-between gap-[10px] flex-1">
            <label className="text-[18px] text-gray-400" htmlFor="">
              Title
            </label>
            <input
              className="p-[20px] border border-gray-300 "
              type="text"
              name="title"
              placeholder="e.g I will do something I'm really good at"
              onChange={handleChange}
            />
            <label className="text-[18px] text-gray-400" htmlFor="">
              Category
            </label>
            <select
              className="p-[20px] border border-gray-300 "
              name="cat"
              id="cat"
              onChange={handleChange}
            >
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            <div className="flex items-center justify-between gap-5">
              <div className="flex flex-col gap-5">
                <label className="text-[18px] text-gray-400" htmlFor="">
                  Cover Image
                </label>
                <input
                  className="p-[20px] border border-gray-300 "
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label className="text-[18px] text-gray-400" htmlFor="">
                  Upload Images
                </label>
                <input
                  className="p-[20px] border border-gray-300 "
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button
                className="flex items-center justify-center  p-[20px] font-medium text-[18px] bg-[#1dbf73] border-none text-white cursor-pointer"
                onClick={handleUpload}
              >
                {uploading ? "Uploading" : "Upload"}
              </button>
            </div>
            <label className="text-[18px] text-gray-400" htmlFor="">
              Description
            </label>
            <textarea
              className="p-[20px] border border-gray-300 resize-none "
              name="desc"
              id=""
              cols="30"
              rows="16"
              placeholder="Brief description of your service"
              onChange={handleChange}
            ></textarea>
            {uploading ? (
              ""
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="p-[20px] font-medium text-[18px] bg-[#1dbf73] border-none text-white cursor-pointer"
              >
                Create
              </button>
            )}
          </div>
          <div className="flex flex-col justify-between gap-[10px] flex-1">
            <label className="text-[18px] text-gray-400" htmlFor="">
              Service Title
            </label>
            <input
              className="p-[20px] border border-gray-300 "
              type="text"
              name="shortTitle"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />
            <label className="text-[18px] text-gray-400" htmlFor="">
              Short Description
            </label>
            <textarea
              className="p-[20px] border border-gray-300 resize-none"
              name="shortDesc"
              id=""
              cols="30"
              rows="10"
              placeholder="Short description of your service"
              onChange={handleChange}
            ></textarea>
            <label className="text-[18px] text-gray-400" htmlFor="">
              Delivery Time (e.g. 3 days)
            </label>
            <input
              className="p-[20px] border border-gray-300 "
              type="number"
              name="deliveryTime"
              min={1}
              onChange={handleChange}
            />
            <label className="text-[18px] text-gray-400" htmlFor="">
              Revision Number
            </label>
            <input
              className="p-[20px] border border-gray-300 "
              type="number"
              name="revisions"
              min={1}
              onChange={handleChange}
            />
            <label className="text-[18px] text-gray-400" htmlFor="">
              Add Features
            </label>
            <form
              action=""
              className="flex justify-between"
              onSubmit={handleFeature}
            >
              <input
                className="w-[80%] p-[20px] border border-gray-300 "
                type="text"
                placeholder="e.g. page number"
              />
              <button className="p-[20px] font-medium text-[18px] bg-[#1dbf73] border-none text-white cursor-pointer">
                Add
              </button>
            </form>
            <div className="flex gap-5">
              {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                    className="flex items-center gap-5 p-[20px] font-normal bg-transparent border border-red-600 text-red-600 cursor-pointer h-[30px] text-[12px]"
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label className="text-[18px] text-gray-400" htmlFor="">
              Price
            </label>
            <input
              className="p-[20px] border border-gray-300 "
              name="price"
              type="number"
              min={1}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;

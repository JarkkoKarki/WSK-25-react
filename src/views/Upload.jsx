import TextInput from '../components/ui/TextInput';
import {useFile, useMedia} from '../hooks/apiHooks';
import useForm from '../hooks/formHooks';
import {useState} from 'react';

const Upload = () => {
  const [file, setFile] = useState(null);
  const {postFile} = useFile();
  const {postMedia} = useMedia();

  const doUpload = async () => {
    try {
      const token = window.localStorage.getItem('token');

      const fileResult = await postFile(file, token);
      console.log('fileResult', fileResult);

      const mediaResult = await postMedia(fileResult.data, inputs, token);
      console.log('mediaResult', mediaResult);
    } catch (error) {
      console.log('error', error);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(doUpload);

  const handleFileChange = (evt) => {
    if (evt.target.files) {
      console.log(evt.target.files[0]);
      setFile(evt.target.files[0]);
    }
  };

  return (
    <div className="rounded-lg bg-stone-700 p-6 text-white shadow-lg">
      <h1 className="mb-4 text-3xl font-bold">Upload</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          label="Title"
          name="title"
          type="text"
          id="title"
          className="w-full rounded-lg bg-stone-800 p-2 text-white"
        />
        <div>
          <label htmlFor="description" className="mb-2 block font-semibold">
            Description
          </label>
          <textarea
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
            className="w-full rounded-lg bg-stone-800 p-2 text-white"
          ></textarea>
        </div>
        <div>
          <label htmlFor="file" className="mb-2 block font-semibold">
            File
          </label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
            className="block w-full text-white file:mr-4 file:rounded-lg file:border-0 file:bg-stone-800 file:px-4 file:py-2 file:text-white hover:file:bg-gray-700"
          />
        </div>
        <img
          src={
            file
              ? URL.createObjectURL(file)
              : 'https://placehold.co/600x400?text=Choose+image'
          }
          alt="preview"
          className="mt-4 rounded-lg shadow-lg"
          width="200"
        />
        <button
          type="submit"
          disabled={file && inputs?.title.length > 3 ? false : true}
          className="mt-4 w-full rounded-lg bg-stone-800 px-4 py-2 font-semibold text-white transition-all duration-300 ease-in-out hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default Upload;

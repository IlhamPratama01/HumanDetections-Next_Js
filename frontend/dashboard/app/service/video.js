"use client";
import "../globals.css";
import { useState, useEffect } from "react";
import axios from "axios";

export function Video() {
  const [file, setFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false); // State untuk status upload

  // Ambil URL video dari localStorage saat komponen pertama kali dimuat
  useEffect(() => {
    const savedVideoUrl = localStorage.getItem("videoUrl");
    if (savedVideoUrl) {
      setVideoUrl(savedVideoUrl); // Set URL video dari localStorage jika ada
    }
  }, []);

  // Fungsi untuk menangani perubahan file
  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Set file saat user memilih file baru
  };

  // Fungsi untuk mengirimkan file ke backend
  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload a file first!");
      return;
    }

    // Membuat FormData untuk dikirim ke server
    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true); // Set status uploading menjadi true

    try {
      // Melakukan request ke backend Flask
      const response = await axios.post(
        "http://localhost:8000/upload_video/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        // Mengambil URL video dari respons
        const videoSource = response.data.video_url;

        // Ganti video lama dengan video baru setelah upload berhasil
        setVideoUrl(videoSource);
        localStorage.setItem("videoUrl", videoSource); // Simpan URL video baru ke localStorage
      } else {
        alert("Error: Unable to upload video.");
      }
    } catch (error) {
      console.error("There was an error uploading the video!", error);
      alert("There was an error uploading the video!");
    } finally {
      setIsUploading(false); // Set status uploading kembali ke false
      
      // Reload page setelah animasi selesai // Delay 1 detik sebelum reload (sesuaikan sesuai kebutuhan)
    }
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-xl p-6 mx-auto"
      style={{
        width: "902px",
        height: "590px",
        boxShadow: "5px 7px 2px rgba(0, 0, 0, 0.6)",
      }} // Shadow hanya di kanan dan bawah
    >
      <div className="text-center">
        <h5 className="text-2xl mb-2 font-bold tracking-tight text-gray-900">
          Human Detections
        </h5>
        {videoUrl ? (
          <video
            className="w-full h-96 border-2 aspect-video rounded-lg object-contain"
            autoPlay
            controls
            loop
            style={{ boxShadow: "5px 7px 2px rgba(0, 0, 0, 0.2)" }}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p>No video available. Please upload a video.</p>
        )}
      </div>
      <div className="mt-6">
        <label
          className="block mb-2 text-sm font-bold text-gray-900"
          htmlFor="file_input"
        >
          Upload File
        </label>
        <input
          className="block w-full mb-2 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
          id="file_input"
          type="file"
          accept="video/*" // Membatasi input hanya untuk file video
          onChange={handleFileChange} // Handle perubahan file
        />
        <button
          type="button"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          style={{ boxShadow: "5px 7px 2px rgba(0, 0, 255, 0.3)" }}
          onClick={handleSubmit} // Kirim file ketika klik submit
        >
          {isUploading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  fill="currentColor"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0zm4-1h8a4 4 0 1 0-8 0z"
                />
              </svg>
              Processing...
            </div>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  );
}

// src/admindash/ContactMessages.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

export default function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // "desc" = latest first
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 5; // pagination limit

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/contact")
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Filter messages based on search term
  const filteredMessages = messages.filter((msg) =>
    `${msg.fullName} ${msg.email} ${msg.message}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Sort messages by date
  const sortedMessages = [...filteredMessages].sort((a, b) => {
    return sortOrder === "desc"
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : new Date(a.createdAt) - new Date(b.createdAt);
  });

  // Pagination logic
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = sortedMessages.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  );
  const totalPages = Math.ceil(sortedMessages.length / messagesPerPage);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Contact Messages
        </h1>

        {/* Search + Sort */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by name, email, or message..."
            className="border p-2 rounded-lg w-full md:w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="border p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="desc">Latest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>

        {/* Table */}
        <div className="w-full max-w-6xl mx-auto border rounded-2xl shadow-lg p-4 bg-white overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-blue-100 text-left">
                <th className="p-3 border">Full Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Message</th>
                <th className="p-3 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {currentMessages.map((msg) => (
                <tr
                  key={msg._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 border">{msg.fullName}</td>
                  <td className="p-3 border">{msg.email}</td>
                  <td className="p-3 border">{msg.message}</td>
                  <td className="p-3 border">
                    {new Date(msg.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}

              {currentMessages.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="p-3 border text-center text-gray-500"
                  >
                    No messages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded-lg disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === idx + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded-lg disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

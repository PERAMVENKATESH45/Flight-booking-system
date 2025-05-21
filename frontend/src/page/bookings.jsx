import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKENDURL } from "../Config/Config";
import { Link } from "react-router-dom";

const Bookings = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${BACKENDURL}/api/v1/auth/getUser`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // Sort tickets by createdAt (latest first)
        const sortedTickets = (res.data.tickets || []).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setTickets(sortedTickets);
      })
      .catch((err) => {
        console.error("Failed to fetch bookings:", err);
      });
  }, []);

  return (
    <div className="px-[30px] md:px-[30px] py-10 max-w-[1000px] mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      <h1 className="">"View more details and manage your booking in action" </h1>
      {tickets.length > 0 ? (
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Ticket ID</th>
              
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id} className="text-center">
                <td className="p-2 border">{ticket.uid}</td>
                
                <td className="p-2 border">
                  <Link
                    to={`/ticket/${ticket.uid}`}
                    className="text-blue-500 underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No bookings found.</p>
      )}
    </div>
  );
};

export default Bookings;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AllPostings() {
  const [postings, setPostings] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/everyposting/allpostings')
      .then((response) => {
        console.log(response.data)
        setPostings(response.data);
      })
      .catch((err) => {
        console.log('Error fetching the list of postings', err);
      });
  }, []);

  return (
    <div className="page-container">
      <h1 className="allpostings-container">All Postings</h1>
      <div className="postings-container">
        {postings.map((postin) => (
          <div key={postin.thriftstore} className="thriftstorepost">
            <div className='thriftstorepostfont'>{postin.thriftstore}</div>
            <div className="address-top">{postin.address}</div>
            <div className="city-top">{postin.pickupcomments}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
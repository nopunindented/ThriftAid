import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AllPostings() {
  const [postings, setPostings] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/everyposting/allpostings')
      .then((response) => {
        setPostings(response.data);
      })
      .catch((err) => {
        console.log('Error fetching the list of postings', err);
      });
  }, []);

  return (
    <div>
      <h1 className='allpostings-container'>All Postings</h1>
      <div className='postings-container'>
        {postings.map((postin) => (
          <div key={postin.thriftstore} className='allpostingcontainer'>
            <h1 className='thriftstorepost'>{postin.thriftstore}</h1>
            <h3>{postin.city}</h3>
            <h3>{postin.country}</h3>
            <h3>{postin.pickuptime}</h3>
            <h3>{postin.pickupdate}</h3>
            <h3>{postin.numberofphone}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

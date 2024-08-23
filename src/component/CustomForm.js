import React, { useState } from 'react';
import { Box, TextField, Button, Container } from '@mui/material';

function CustomForm() {

  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const handleClick = async () => {
    const host = 'http://localhost:8080/url';
    const data = {
      originalUrl: url
    };

    try {
      const response = await fetch(host, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        console.log('ERROR:');
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.text();
      console.log('Response:', result);
      setShortUrl(result)
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          mt: 4,
          p: 3,
          borderRadius: 1,
          boxShadow: 3,
        }}
      >
        <TextField
          label="Enter URL"
          variant="outlined"
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleClick}>
          Submit
        </Button>
        <TextField
          label="Short URL"
          variant="outlined"
          fullWidth
          value={shortUrl}
        />
      </Box>
    </Container>
  );
}

export default CustomForm;

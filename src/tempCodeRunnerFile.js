   // try {
    //   const response = await fetch(endpoint, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(requestBody),
    //   });

    //   const result = await response.json();
    //   console.log('API Response:', result);

    //   if (result.candidates && result.candidates.length > 0) {
    //     const responseText = result.candidates[0].content.parts[0].text;
    //     setSearchResult(responseText);
    //   } else {
    //     console.log('Full API Response:', result);
    //     throw new Error('No candidates returned from API.');
    //   }
    // } catch (error) {
    //   console.error("Error generating content:", error.message || error);
    //   setSearchResult("An error occurred while generating content.");
    // }
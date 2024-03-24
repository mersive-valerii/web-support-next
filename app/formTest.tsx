"use client"

async function handleTestSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
  
    try {
      const response = await fetch("/api/hello", {
        method: "GET",
      });
  
    //   const data = await response.json();
  
      console.log(response);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  

// interface TestFormProps {
//     handleTestSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
//   }
  
  const TestForm = () => {
    return (
      <form onSubmit={handleTestSubmit}>
        <button type="submit">Submit</button>
      </form>
    );
  };
  
  export default TestForm;
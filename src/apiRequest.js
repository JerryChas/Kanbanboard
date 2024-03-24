const apiRequest = async (url = '', optionsObj = null, errMsg = null) => {
  try {
    const response = await fetch(url, optionsObj);
    if (!response.ok) throw Error('Please reload the app'); // state of the app may not be in sync with the server
  } catch (err) {
    errMsg = err.message;
  } finally {
    return errMsg;
  }
};

export default apiRequest;

//!Använd denna fetch

// API_URL = 'http://localhost:3500/tasks';

// useEffect(() => {
//   const fetchTasks = async () => {
//     try {
//       const response = await fetch(API_URL);
//       if (!response.ok) throw Error('Could not receive expected data');
//       const data = await response.json();
//       setTaskList(data);
//     } catch (err) {
//       setFetchError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };
// });

const AllCount = async () => {
  console.log('AllCount function called');
  try {
    const response = await fetch("http://localhost:3001/api/allDocuments");
    console.log('Response Object:', response);

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const res = await response.json();
    console.log('Parsed JSON Response:', res);

    if (res?.success) return res.data;

    return undefined;
  } catch (error: any) {
    console.error("Error fetching all counts: ", error.message);
    return undefined;
  }
};

export default AllCount;
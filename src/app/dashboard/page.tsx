"use client";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const userId = localStorage.getItem("userId");
  const { push } = useRouter();
  if (!userId) {
    push(`/`);
  }

  const handleLogin = async (userId: Number) => {
    console.log("USERID DASHBOARD PAGE :",userId)
    try {
      const response = await fetch("http://localhost:3001/graphql", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          operationName: null,
          variables: {
            userId: userId,
          },
          query: `query userById($userId: Int!) {
            userById(id: $userId) {
              id
              email
              username
                todos {
                  id
                  description
                }
            }
          }`,
        }),
      });

      const json = await response.json();
      const data = json.data;
      console.log("DATA DASHBOARD PAGE :", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  handleLogin(Number(userId))
  return <div>Dashboard</div>;
};

export default DashboardPage;

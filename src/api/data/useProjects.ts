import { collection, CollectionReference, getDocs } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import Project from "../models/Project.model";
import fireDB from "./fireDB";

// Get a list of cities from your database
async function getProjects(): Promise<Project[]> {
  const citiesCol= collection(fireDB, "projects") as CollectionReference<Project>;
  const citySnapshot = await getDocs<Project>(citiesCol);
  const cityList = citySnapshot.docs.map((doc) => doc.data());
  return cityList;
}

export default function useProjects() {
  const [projects, setProjects] = useState<Project[] | null>(null);

  useEffect(() => {
    const callback = async () => {
      const projects = await getProjects();
      setProjects(projects);
    };

    callback();
  }, []);

  return { projects };
}

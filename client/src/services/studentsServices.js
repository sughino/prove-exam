import useSWR from 'swr';
import { api } from './api.js';
import { useCallback } from 'react';
import { useAxiosRequest } from './axiosRequest.js';

const filterTextMap = {
  'Serial': 'serialNumber',
  'Name': 'name',
  'Surname': 'surname'
};

const getBaseUrl = () => {
  const { hostname, protocol } = window.location;
  
  if (hostname === 'localhost') {
    return 'http://localhost:5000/api';
  } else {
    return 'https://prove-exam-server.vercel.app/api';
  }
};
const BASE_URL = getBaseUrl();
//const BASE_URL = 'http://localhost:5000/api';

const studentsService = {

  useStudents(searchedText, filterText, sortBy, options = {}) {
    const order = sortBy ? 'desc' : 'asc';
    const orderBy = filterTextMap[filterText] || 'name';
    
    const url = `${BASE_URL}/general/students?query=${searchedText}&orderBy=${orderBy}&sortBy=${order}`;
    
    const { data, error, isValidating, mutate } = useSWR(url, options);

    if (data) {
      localStorage.setItem('studentsLength', data.length);
    }
    
    return {
      students: data || [],
      isLoading: !error && !data,
      isValidating,
      isError: error,
      mutate
    };
  },
  useStudentInsertion() {
    const { loading, error, makeRequest } = useAxiosRequest();

    const insertStudent = useCallback(async (formData) => {
      const url = `${BASE_URL}/insert/students`;
      
      return makeRequest(() => api.post(url, formData));
    }, [makeRequest]);

    return {
      isInsertLoading: loading,
      isInsertError: error,
      insertStudent
    };
  },
  useModifyStudent() {
    const { loading, error, makeRequest } = useAxiosRequest();

    const modifyStudent = useCallback(async (formData) => {
      const url = `${BASE_URL}/modify/students`;

      return makeRequest(() => api.put(url, formData));
    }, [makeRequest]);

    return {
      isModifingLoading: loading,
      isModifyError: error,
      modifyStudent
    };
  },
  useDeleteStudent() {
    const { loading, error, makeRequest } = useAxiosRequest();

    const deleteStudent = useCallback(async (serial) => {
      const url = `${BASE_URL}/delete/students`;
      
      return makeRequest(() => api.delete(url, {
        data: { serial }
      }));
    }, [makeRequest]);

    return {
      isDeletingLoading: loading,
      isDeleteError: error,
      deleteStudent
    };
  }
};

export default studentsService;


//TODO modifica ricerca: se non trova niente allora prova a cercare per il cognome, se scrivi il nome e c'è uno spazio
//* allora supponi che sta cercando nome e cognome, quindi il primo lo prendi sempre come nome e dopo lo spazio inseirsci
//* la ricerca per nome e cognome
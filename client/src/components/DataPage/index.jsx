import { TableTemplate } from "../../utils/TableTemplate";
import { Card } from "../../utils/SpotlightCard";
import { Skeleton } from '@mui/material';
import { ThemeContext } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { Filters } from "../../utils/Filters";
import { Spacer } from "../../utils/Spacer";
import Text from "../../utils/Text";
import { Modal } from "../../utils/modal";
import { DataForms } from "../DataForms";
import { Button } from "../../utils/buttons";
import { Separator } from "../../utils/Separator";
import { useLocation } from "react-router-dom";
import studentsService from "../../services/studentsServices";
import { Dialog } from "../../utils/dialog";
import './DataPage.css';

export const Students = () => {
    let location = useLocation().pathname.substring(1);
    let activeText = location.charAt(0).toUpperCase() + location.slice(1);

    const theme = useContext(ThemeContext);
    const studentsLength = localStorage.getItem('studentsLength');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isTable, setIsTable] = useState(false);
    const [searchedText, setSearchedText] = useState('');
    const [filterText, setFilterText] = useState('');
    const [sortBy, setSortBy] =  useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if(!isModalOpen) {
                setIsEditing(false);
                setIsDeleting(false);
                setSelectedStudent({});
            }
          }, 500);
        return () => clearTimeout(timeout);
    }, [isModalOpen])

    const { students, isLoading, isError, mutate } = studentsService.useStudents(
        searchedText, 
        filterText, 
        sortBy,
        {
          revalidateOnFocus: true,
          refreshInterval: 30000
        }
    );
    const { insertStudent, isInsertLoading, isInsertError } = studentsService.useStudentInsertion();
    const { modifyStudent, isModifingLoading, isModifyError } = studentsService.useModifyStudent();
    const { deleteStudent, isDeletingLoading, isDeleteError } = studentsService.useDeleteStudent();

    const handleSubmit = async (formData) => {
        const result = await insertStudent(formData);
        if (result.success) {
            mutate();
            setIsModalOpen(false);
        }
    }

    const handleModify = async (formData) => {
        const result = await modifyStudent(formData);
        if (result.success) {
            mutate();
            setIsModalOpen(false);
        }
    }

    const handleDeleting = async (serial) => {
        const result = await deleteStudent(serial);
        if (result.success) {
            mutate();
            setIsModalOpen(false);
        }
    }

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {isDeleting ?
                    <Dialog isOpen={isModalOpen} isError={isDeleteError} onCancel={() => setIsModalOpen(false)} onDelete={handleDeleting} isLoading={isDeletingLoading} serial={selectedStudent.serial} name={selectedStudent.name} surname={selectedStudent.surname}/>
                    :
                    !isEditing ?
                        <DataForms isOpen={isModalOpen} onCancel={() => setIsModalOpen(false)} onSubmit={handleSubmit} isError={isInsertError} isLoading={isInsertLoading} isEditing={isEditing}/>
                        :
                        <DataForms isOpen={isModalOpen} onCancel={() => setIsModalOpen(false)} onSubmit={handleModify} isError={isModifyError} isLoading={isModifingLoading} student={selectedStudent} isEditing={isEditing}/>   
                }    
            </Modal>

            <div className="exam-content-container">
                <div className="top-content-container">
                    <Text variant={'h1'}>{activeText}</Text>
                    <Button onlyicon={true} iconName={'plus'} variant={'primary'} size={'big'} onClick={()=>{setIsModalOpen(true);setIsDeleting(false);setIsEditing(false);}}/>
                </div>

                <Separator/>
                <Spacer height={theme.sizes.gap3}/>
                
            
                <Filters tab={activeText} onSelect={setIsTable} onSearchedText={setSearchedText} onSortBy={setSortBy} onFiltersBy={setFilterText}/>
                <Spacer height={theme.sizes.gap3}/>
                {
                isError ?
                    <div className="error-handler">
                        <Text variant={'h1'} color={theme.colors.black50}>An error occurred</Text>
                    </div>
                :
                    <div className={`data-container-scroll ${isTable ? 'table': 'card'}`}>
                        {
                        isTable ?
                            <TableTemplate data={students} />
                        :
                            <div className="data-container card">
                                {isLoading ? (
                                    Array.from({ length: studentsLength || 6 }).map((_, index) => (
                                        <Skeleton key={index} variant="rectangle" width={'100%'} height={259} sx={{ bgcolor: theme.colors.white05, borderRadius: '20px' }}/>
                                    ))
                                ) : (
                                    students.map((s, i) => (
                                        <Card
                                            serial={s.serialNumber}
                                            name={s.name}
                                            surname={s.surname}
                                            email={s.email}
                                            address={s.address}
                                            zip={s.zip}
                                            city={s.city}
                                            province={s.province}
                                            onDelete={(selectedStudent) => {setSelectedStudent(selectedStudent);setIsDeleting(true);setIsModalOpen(true);}}
                                            onModify={(selectedStudent) => {setSelectedStudent(selectedStudent);setIsEditing(true);setIsModalOpen(true);}}
                                        />
                                    ))
                                )}
                            </div>
                        }
                    </div>
                }
            </div>
        </>
    )
}

export const Courses = () => {
    
}

export const Exams = () => {
    
}
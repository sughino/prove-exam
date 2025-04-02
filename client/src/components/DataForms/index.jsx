import { Form, Formik } from "formik";
import { object, string } from "yup";
import { InputField } from "../../utils/inputsField";
import { Button } from "../../utils/buttons";
import Text from "../../utils/Text";
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "styled-components";
import { Loader } from "../../utils/loader";
import './DataForms.css';

export const DataForms = ({ isOpen, onCancel, onSubmit, isError, isLoading, student, isEditing }) => {
    const theme = useContext(ThemeContext)
    const formikRef = useRef();

    const [localError, setLocalError] = useState(false);

    useEffect(() => {
        setLocalError(true);
    }, [isError])

    useEffect(() => {
        const timeout = setTimeout(() => {
            if(!isOpen) {
                formikRef.current?.resetForm();
                setLocalError(false);
            }
          }, 500);
        return () => clearTimeout(timeout);
    }, [isOpen])

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                const activeElement = document.activeElement;
                const isTextField = activeElement.tagName === 'TEXTAREA' || 
                                   activeElement.getAttribute('role') === 'textbox';
                
                if (!isTextField || !activeElement.getAttribute('multiline')) {
                    event.preventDefault();
                    if (formikRef.current && formikRef.current.isValid && formikRef.current.dirty) {
                        formikRef.current.submitForm();
                    }
                }
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const schema = object({
        serial: string()
            .test('letters', 'Serial must have only number', (value) => /^[0-9]+$/.test(value))
            .test('length', 'Serial must be 4 or 5 characters', (value) => value.length >= 4 && value.length <= 5)
            .test('greaterThanZero', 'The value of serial must be greater than 0', (value) => parseInt(value, 10) > 0)
            .required("Required!"),
    
        email: string()
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email must be valid')
            .required("Required!"),
        name: string()
            .matches(/^[a-zA-Z]+$/, 'Name must have only letters')
            .required("Required!"),
        surname: string()
            .matches(/^[a-zA-Z]+$/, 'Surname must have only letters')
            .required("Required!"),
    
        address: string()
            .required("Required!"),
        city: string()
            .matches(/^[a-zA-Z]+$/, 'City must have only letters')
            .required("Required!"),
        province: string()
            .matches(/^[a-zA-Z]{2}$/, 'Province must have 2 characters')
            .required("Required!"),
        zip: string()
            .test('letters', 'Zip must have only number', (value) => /^[0-9]+$/.test(value))
            .test('length', 'Zip must have 5 characters', (value) => value.length === 5)
            .test('greaterThanZero', 'The value of zip must be greater than 0', (value) => parseInt(value, 10) > 0)
            .required('Required!'),
    });

    const initialValues = {
        serial: student?.serial?.toString() || "",
        email: student?.email || "",
        name: student?.name || "",
        surname: student?.surname || "",
        address: student?.address || "",
        city: student?.city || "",
        province: student?.province || "",
        zip: student?.zip?.toString() || ""
    };

    return (
        <Formik
            innerRef={formikRef}
            validationSchema={schema}
            initialValues={initialValues}
            enableReinitialize={true} 
            onSubmit={(values) => {
                const formData = {
                    ...values,
                    serial: values.serial ? parseInt(values.serial, 10) : null,
                    zip: values.zip ? parseInt(values.zip, 10) : null,
                    ...(isEditing && { oldEmail: student?.email }),
                };
                
                onSubmit(formData);
            }}
        >
            {({ values, setTouched, setFieldValue, errors, touched }) => (
                <Form className="form-container">
                    <div className="inner-form-container-flex col">
                        <Text variant={"h2"}>{isEditing ? "Edit student" : "Add a new student"}</Text>
                        {localError && isError?.response?.data?.message ? <Text variant={'h5'} color={theme.colors.warning}>{isError.response.data.message}</Text> : null}
                    </div>
                    
                    <div className="inner-form-container-flex col">
                        <Text variant={"subtitle"}>Tell about you</Text>
                        <div className="inner-form-container-split">
                            <InputField 
                                value={values.serial} 
                                onChange={(e) => setFieldValue("serial", e.currentTarget.value)}
                                onBlur={() => setTouched({ ...touched, serial: true})}
                                isCorrect={touched.serial && !errors.serial} 
                                placeholder="Serial"
                                name="serial"
                                errorMessage={touched.serial && errors.serial && errors.serial}
                                type={"number"}
                                isDisabled={isEditing ? true : false}
                            />
                        </div>
                        <InputField 
                            value={values.email} 
                            onChange={(e) => setFieldValue("email", e.currentTarget.value)}
                            onBlur={() => setTouched({ ...touched, email: true})}
                            isCorrect={touched.email && !errors.email} 
                            placeholder="Email"
                            name="email"
                            errorMessage={touched.email && errors.email && errors.email}
                            type={"email"}
                        />
                        <div className="inner-form-container-flex row">
                            <InputField 
                                value={values.name} 
                                onChange={(e) => setFieldValue("name", e.currentTarget.value)}
                                onBlur={() => setTouched({ ...touched, name: true})}
                                isCorrect={touched.name && !errors.name} 
                                placeholder="Name"
                                name="name"
                                errorMessage={touched.name && errors.name && errors.name}
                            />
                            <InputField 
                                value={values.surname} 
                                onChange={(e) => setFieldValue("surname", e.currentTarget.value)}
                                onBlur={() => setTouched({ ...touched, surname: true})}
                                isCorrect={touched.surname && !errors.surname} 
                                placeholder="Surname"
                                name="surname"
                                errorMessage={touched.surname && errors.surname && errors.surname}
                            />
                        </div>
                    </div>

                    <div className="inner-form-container-flex col wrap">
                        <Text variant={"subtitle"}>Tell about your address</Text>
                        <InputField 
                            value={values.address} 
                            onChange={(e) => setFieldValue("address", e.currentTarget.value)}
                            onBlur={() => setTouched({ ...touched, address: true})}
                            isCorrect={touched.address && !errors.address} 
                            placeholder="Address"
                            name="address"
                            errorMessage={touched.address && errors.address && errors.address}
                        />
                        <div className="inner-form-container-flex row">
                            <InputField 
                                value={values.city} 
                                onChange={(e) => setFieldValue("city", e.currentTarget.value)}
                                onBlur={() => setTouched({ ...touched, city: true})}
                                isCorrect={touched.city && !errors.city} 
                                placeholder="City"
                                name="city"
                                errorMessage={touched.city && errors.city && errors.city}
                            />
                            <InputField 
                                value={values.province} 
                                onChange={(e) => setFieldValue("province", e.currentTarget.value)}
                                onBlur={() => setTouched({ ...touched, province: true})}
                                isCorrect={touched.province && !errors.province} 
                                placeholder="Province"
                                name="province"
                                errorMessage={touched.province && errors.province && errors.province}
                                style={{textTransform: 'uppercase'}}
                            />
                            <InputField 
                                value={values.zip} 
                                onChange={(e) => setFieldValue("zip", e.currentTarget.value)}
                                onBlur={() => setTouched({ ...touched, zip: true})}
                                isCorrect={touched.zip && !errors.zip} 
                                placeholder="Zip"
                                name="zip"
                                errorMessage={touched.zip && errors.zip && errors.zip}
                                type={"number"}
                            />
                        </div>
                    </div>

                    <div className="inner-form-container-flex row space">
                        <Button variant={'accent'} size={'regular'} type={"cancel"} onClick={(e) => {e.preventDefault();onCancel();}}>Cancel</Button>
                        <Loader isLoading={isLoading} color={theme.colors.white} bgColor={theme.colors.primary}>
                            <Button variant={'primary'} size={'regular'} type={"submit"}>{isEditing ? "Update" : "Submit"}</Button>
                        </Loader>
                    </div>
                </Form>
            )}
        </Formik>
    )
}
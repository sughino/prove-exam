import appError from "../utils/appError.js";
import * as Yup from 'yup';
import {studentsColl, coursesColl, examsColl} from "../utils/collections.js";

const userSchema = Yup.object().shape({
    serial: Yup.string()
        .test('letters', 'Serial must have only number', (value) => /^[0-9]+$/.test(value))
        .test('length', 'Serial must be 4 or 5 characters', (value) => value.length >= 4 && value.length <= 5)
        .test('greaterThanZero', 'The value of serial must be greater than 0', (value) => parseInt(value, 10) > 0)
        .required("Required!"),
    
    email: Yup.string()
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email must be valid')
        .required("Email is required!"),
    name: Yup.string()
        .matches(/^[a-zA-Z]+$/, 'Name must have only letters')
        .required("Name is required!"),
    surname: Yup.string()
        .matches(/^[a-zA-Z]+$/, 'Surname must have only letters')
        .required("Surname is required!"),
    
    address: Yup.string()
        .required("Address is required!"),
    city: Yup.string()
        .matches(/^[a-zA-Z]+$/, 'City must have only letters')
        .required("City is required!"),
    province: Yup.string()
        .matches(/^[a-zA-Z]{2}$/, 'Province must have 2 characters')
        .required("Province is required!"),
    zip: Yup.string()
        .test('letters', 'Zip must have only number', (value) => /^[0-9]+$/.test(value))
        .test('length', 'Zip must have 5 characters', (value) => value.length === 5)
        .test('greaterThanZero', 'The value of zip must be greater than 0', (value) => parseInt(value, 10) > 0)
        .required('Required!')
});

export async function insertStudents(req, res, next) {
    try {
        const userData = req.body;
        try {
            await userSchema.validate(userData, { abortEarly: false });
        } catch (validationError) {
            return res.status(400).json({
                status: 'error',
                errors: validationError.errors
            });
        }

        const existingSerial = await studentsColl.findOne({ serialNumber: userData.serial });
        const existingMail = await studentsColl.findOne({ email: userData.email });
        if (existingSerial || existingMail) {
            return res.status(409).json({
                status: 'error',
                data: {},
                message: 'Student already exists',
                code: 409
            });
        }

        await studentsColl.insertOne({
            serialNumber: userData.serial,
            name: userData.name.trim().replace(/^./, char => char.toUpperCase()),
            surname: userData.surname.trim().replace(/^./, char => char.toUpperCase()),
            address: userData.address.trim().replace(/^./, char => char.toUpperCase()),
            province: userData.province.trim().toUpperCase(),
            email: userData.email.toLowerCase(),
            city: userData.city.trim().replace(/^./, char => char.toUpperCase()),
            zip: userData.zip
        });

        res.status(201).json({
            status: 'success',
            data: {},
            message: 'User inserted successfully',
            code: 201
        });

    } catch (error) {
        console.error(error);
        return next(new appError('Error inserting user', 500));
    }
}
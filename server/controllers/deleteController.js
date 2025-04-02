import appError from "../utils/appError.js";
import {studentsColl, coursesColl, examsColl} from "../utils/collections.js";

export async function deleteStudents(req, res, next) {
    const serialBody = req.body.serial;
    try {
        const existingSerial = await studentsColl.findOne({ serialNumber: serialBody });
        if (!existingSerial) {
            return res.status(404).json({
                status: 'error',
                data: {},
                message: 'Student not found',
                code: 404
            });
        }
        
        await studentsColl.deleteOne({serialNumber: serialBody})

        res.status(204).json({
            status: 'success',
            data: {},
            message: 'User deleted successfully',
            code: 204
        });
        
    } catch (error) {
        console.error(error);
        return next(new appError('Error deleting user', 500));
    }
}
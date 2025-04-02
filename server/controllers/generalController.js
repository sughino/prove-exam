import {studentsColl, coursesColl, examsColl} from "../utils/collections.js";

const options = {
    projection: {_id: 0},
};

export async function getStudents(req, res) {
    const { query, orderBy, sortBy } = req.query;
    let queryObj = {};
    let sortOptions = {};

    // Determina l'ordine (1 per crescente, -1 per decrescente)
    const order = sortBy === 'desc' ? -1 : 1;
    sortOptions[orderBy] = order;

    const finalOptions = {
        ...options,
        sort: sortOptions
    };
    
    try {
        let result = [];
        
        if (query) {
            queryObj.name = { $regex: `^${query}`, $options: 'i' };
            
            const nameCursor = await studentsColl.find(queryObj, finalOptions);
            for await (const doc of nameCursor) {
                result.push(doc);
            }
            
            if (result.length === 0) {
                queryObj = {};
                queryObj.surname = { $regex: `^${query}`, $options: 'i' };
                
                const surnameCursor = await studentsColl.find(queryObj, finalOptions);
                for await (const doc of surnameCursor) {
                    result.push(doc);
                }
                
                if (result.length === 0 && query.includes(' ')) {
                    const [firstName, lastName] = query.split(' ', 2);
                    
                    queryObj = {
                        name: { $regex: `^${firstName}`, $options: 'i' },
                        surname: { $regex: `^${lastName}`, $options: 'i' }
                    };
                    
                    const fullNameCursor = await studentsColl.find(queryObj, finalOptions);
                    for await (const doc of fullNameCursor) {
                        result.push(doc);
                    }
                }
            }
        } else {
            const cursor = await studentsColl.find({}, finalOptions);
            for await (const doc of cursor) {
                result.push(doc);
            }
        }
        
        res.status(200).json(result);
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Database error', message: error.message });
    }
}

export async function getCourses(req, res) {
    const { query } = req.query;
    const result = [];

    if (query) {
        const cursor = await coursesColl.find({ 
            name: { $regex: `^${query}`, $options: 'i' } 
        }, options);
        
        for await (const doc of cursor) {
            result.push(doc);
        }
    } else {
        const cursor = await coursesColl.find({}, options);
        for await (const doc of cursor) {
            result.push(doc);
        }
    }

    res.status(200).json(result);
}
    
export async function getExams(req, res) {
    const result = [];
    const cursor = await examsColl.find({}, options);
    for await (const doc of cursor) {
        result.push(doc);
    }
    res.status(200).json(result);
}
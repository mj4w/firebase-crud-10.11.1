import firestore from '../db';
import { collection, addDoc, query, where, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const db = firestore;

const addStudent = async (req, res, next) => {
    try {
        const data = req.body;

        const usersCollection = collection(db, 'users');
        const nameQuery  = query(usersCollection, 
            where("firstName", "==", data.firstName),
            where("lastName", "==", data.lastName)
        );
        const nameSnapshot = await getDocs(nameQuery );
        if (!nameSnapshot.empty) {
            return res.status(400).json({ msg: "First name and last name already exist" });
        }

        const docRef = await addDoc(usersCollection, data);

        res.json({ msg: "Added Successfully", id: docRef.id });
    } catch (error) {
        console.error('Error adding student:', error);
        res.status(400).json({ msg: error.message })
    }
};

const getAllStudent = async (req, res, next) => {
    try {
        const studentsRef = collection(db, 'users');
        const data = await getDocs(studentsRef);
        const studentsArray = [];
        
        if (data.empty) {
            res.status(404).json({ msg: "No students found" });
        } else {
            data.forEach(doc => {
                const student = {
                    id: doc.id,
                    firstName: doc.data().firstName,
                    lastName: doc.data().lastName
                };
                studentsArray.push(student);
            });
            res.json({ data: studentsArray });
        }
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
};

const getStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const studentRef = doc(db, 'users', id);
        const data = await getDoc(studentRef);

        if (!data.exists()) {
            res.status(404).json({ msg: "Student with the given ID not found" });
        } else {
            res.json({ data: data.data() });
        }
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const updateStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const studentRef = doc(db, 'users', id);
        await updateDoc(studentRef, data);

        res.json({ msg: "Student updated successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const deleteStudent = async (req, res, next) => {
    try {
        const id = req.params.id;

        const studentRef = doc(db, 'users', id);
        await deleteDoc(studentRef);

        res.json({ msg: "Student deleted successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export { 
    addStudent,
    getAllStudent,
    getStudent,
    updateStudent,
    deleteStudent,
};

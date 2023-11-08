import Job from '../models/Job.js';
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import {
    BadRequestError,
    NotFoundError
} from '../errors/index.js';
import checkPermissions from '../utils/checkPermissions.js';

const createJob = async (req, res) => {
    const { position, company } = req.body;

    /* if (!position || !company){
        throw new BadRequestError('Please provide all values');
    } */
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
};


const getAllJobs = async (req, res) => {

    const query = {
        createdBy: req.user.userId,
    };

    const jobs = await Job.find(query);
    const totalJobs = await Job.countDocuments(query);
    res.status(200).json({ jobs, totalJobs })
};

const deleteJob = async (req, res) => {
    try {
        const { id: jobId } = req.params;
        const query = { _id: jobId };
        const job = await Job.findOne(query);
        if (!job) {
            // res.status(404).json({msg: 'Resource not available'});
            res.status(404).json({ msg: `No job with id: ${jobId}` });
        }
        checkPermissions(req.user, job.createdBy);

        await Job.deleteOne(query);

        res.status(200).json({ msg: 'Success! Job removed' });
    } catch (error) {
        res.status(500).json({ msg: 'Request could not be completed! Please try again later.' });
    }

};

const updateJob = async (req, res) => {
    try {
        const { id: jobId } = req.params;
        const query = { _id: jobId };
        const job = await Job.findOne(query);
        if (!job) {
            res.status(404).json({ msg: `No job with id: ${jobId}` });
        }
        checkPermissions(req.user, job.createdBy);

        const option = {
            new: true, // // If true return the modified document rather than the original
            runValidators: true // If true validate the update operation against model schema
        };
        const updatedJob = await Job.findOneAndUpdate(query, req.body, option);
        res.status(200).json({ updatedJob });
    } catch (error) {
        res.status(500).json({ msg: 'Request could not be completed! Please try again later.' });
    }

};

export { createJob, getAllJobs, deleteJob, updateJob };
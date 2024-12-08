const express = require("express");
const router = express.Router();
const client = require("./db");
router.get("/:id/job_applications", async (req, res) => {
    try {
        const jobs = await getJobByUserId(req.params.id);
        console.log("these are the jobs");
        console.log(jobs);
        res.status(200).send(jobs);
    } catch (err) {
        res.status(500).send("Error fetching user jobs");
    }
});

router.post("/:id/job_applications", async (req, res) => {
    try {
        const newJob = req.body;
        console.log(newJob);
        await addJob(req.params.id, newJob);
        res.status(201).send({ msg: "Successfully added job" });
    } catch (err) {
        res.status(500).send({ msg: "Error adding job" });
    }
});

async function addJob(id, job) {
    const job_title = job.job_title;
    const company = job.company;
    const date_appplied = job.date_applied;
    const status = job.status;

    const addJobQ = `
        INSERT INTO job_applications (user_id, job_title, company, date_applied, status)
        VALUES ($1, $2, $3, $4, $5)
    `;

    await client.query(addJobQ, [
        id,
        job_title,
        company,
        date_appplied,
        status,
    ]);
}

async function getJobByUserId(id) {
    const getJobQ = `
        SELECT * FROM job_applications
        WHERE user_id=$1
    `;
    const jobs = await client.query(getJobQ, [id]);
    return jobs.rows;
}
module.exports = router;

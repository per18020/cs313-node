const express = require('express');
const router = express.Router();

const sendQuery = require('../../util/DBConnect');

// /api/week10/team/getPerson?id=ID
function getPersonController(request, response) {
    sendQuery(`SELECT * FROM week10_team_person WHERE id = ${request.query.id}`).then((res) => {
        response.json(res.rows[0]);
    });
}

// /api/week10/team/getParents?id=ID
function getParentsController(request, response) {
    sendQuery(`SELECT * FROM week10_team_parentchild WHERE child_id = ${request.query.id}`).then((res) => {
        let promises = [];
        for (let i = 0; i < res.rows.length; i++) {
            promises.push(
                sendQuery(`SELECT * FROM week10_team_person WHERE id = ${res.rows[i].parent_id}`)
            );
        }
        Promise.all(promises).then((res) => {
            let people = [];
            for (let i = 0; i < res.length; i++) {
                people.push(res[i].rows[0]);
            }
            response.json(people);
        })
    })
}

// /api/week10/team/getChildren?id=ID
function getChildrenController(request, response) {
    sendQuery(`SELECT * FROM week10_team_parentchild WHERE parent_id = ${request.query.id}`).then((res) => {
        let promises = [];
        for (let i = 0; i < res.rows.length; i++) {
            promises.push(
                sendQuery(`SELECT * FROM week10_team_person WHERE id = ${res.rows[i].child_id}`)
            );
        }
        Promise.all(promises).then((res) => {
            let people = [];
            for (let i = 0; i < res.length; i++) {
                people.push(res[i].rows[0]);
            }
            response.json(people);
        })
    })
}

router.get('/getPerson', getPersonController);
router.get('/getParents', getParentsController);
router.get('/getChildren', getChildrenController);

module.exports = router;
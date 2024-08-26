// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract AttendanceVerifier {
    // Mapping to store student attendance records
    mapping(address => uint256) public attendanceRecords;

    // Event to log when a student is created
    event StudentCreated(address indexed studentId);

    // Event to log when attendance is marked
    event AttendanceMarked(address indexed studentId, bool isPresent);

    // Function to create a student (optional, can be used to initialize if needed)
    function createStudent(address _id) public {
        require(attendanceRecords[_id] == 0, "Student already exists");
        attendanceRecords[_id] = 0; // Initialize attendance count to 0
        emit StudentCreated(_id);
    }

    // Function to mark attendance for a student
    function markAttendance(address _id, bool _isPresent) public {
        require(attendanceRecords[_id] >= 0, "Student does not exist");
        if (_isPresent) {
            attendanceRecords[_id]++;
        }
        emit AttendanceMarked(_id, _isPresent);
    }

    // Function to get the attendance record for a student
    function getAttendanceRecord(address _id) public view returns (uint256) {
        return attendanceRecords[_id];
    }

    // Function to reward students based on attendance
   
}

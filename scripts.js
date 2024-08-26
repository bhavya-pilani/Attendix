document.addEventListener('DOMContentLoaded', function() {
    // Ensure MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);
        window.ethereum.request({ method: 'eth_requestAccounts' });

        // Replace these with your actual contract ABI and address
        const attendanceVerifierABI =  [
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "studentId",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "bool",
                        "name": "isPresent",
                        "type": "bool"
                    }
                ],
                "name": "AttendanceMarked",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_id",
                        "type": "address"
                    }
                ],
                "name": "createStudent",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_id",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "_isPresent",
                        "type": "bool"
                    }
                ],
                "name": "markAttendance",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "studentId",
                        "type": "address"
                    }
                ],
                "name": "StudentCreated",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "attendanceRecords",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_id",
                        "type": "address"
                    }
                ],
                "name": "getAttendanceRecord",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ] ;
        const attendanceVerifierAddress = '0x99545cB47F0c7284Cd6bC8d0dEf03589be58c8f6';

        const attendanceVerifierContract = new web3.eth.Contract(attendanceVerifierABI, attendanceVerifierAddress);


        // Event listener for creating a student
        document.getElementById('create-student-form').addEventListener('submit', async function(event) {
            event.preventDefault();
            const studentId = document.getElementById('student-id').value;
            if (web3.utils.isAddress(studentId)) {
                const accounts = await web3.eth.getAccounts();
                try {
                    await attendanceVerifierContract.methods.createStudent(studentId).send({ from: accounts[0] });
                    alert('Student created successfully');
                } catch (error) {
                    console.error(error);
                    alert('Error creating student');
                }
            } else {
                alert('Invalid Ethereum address');
            }
        });

        // Event listener for marking attendance
        document.getElementById('mark-attendance-form').addEventListener('submit', async function(event) {
            event.preventDefault();
            const studentId = document.getElementById('mark-attendance-student-id').value;
            const isPresent = document.getElementById('is-present').checked;
            if (web3.utils.isAddress(studentId)) {
                const accounts = await web3.eth.getAccounts();
                try {
                    await attendanceVerifierContract.methods.markAttendance(studentId, isPresent).send({ from: accounts[0] });
                    alert('Attendance marked successfully');
                } catch (error) {
                    console.error(error);
                    alert('Error marking attendance');
                }
            } else {
                alert('Invalid Ethereum address');
            }
        });
    } else {
        console.log('Please install MetaMask!');
        alert('MetaMask is not installed. Please install it to use this dApp.');
    }
});

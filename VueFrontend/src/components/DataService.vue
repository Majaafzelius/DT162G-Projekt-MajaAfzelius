<script>
    import axios from 'axios';

    const apiUrl = 'http://localhost:3000';
    
    export default {
        fetchDataItems() {
        return axios.get(`${apiUrl}/items`);
        }
    }

</script>

<script>
    let { data } = $props();
    data = data.data;
    const dataTranpose = {};
    for (let modelName in data) {

        for (let uid in data[modelName].images) {
            if (!dataTranpose[uid]) {
                dataTranpose[uid] = {};
            }
            dataTranpose[uid][modelName] = data[modelName].images[uid];
        }
    }
    console.log(dataTranpose)
    const modelNames = Object.keys(data).filter(modelName => modelName !== 'AOI Image' && modelName !== 'Ground Truth');
    const columnOrder = ['AOI Image', 'Ground Truth', ...modelNames];
</script>

<div>
    <table class='table-container'>
        <thead>
            <tr>
                <th></th>
                {#each columnOrder as modelName}
                    <th>{modelName}</th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each Object.keys(dataTranpose) as sample}
                <tr>
                    <td rowspan="2">{sample}</td>
                    {#each columnOrder as modelName}
                        <td>
                            <div class='img-container'>
                                <img class='base-img' src='/{modelName}/images/{dataTranpose[sample][modelName]}' alt={modelName}/>
                                <img class='overlay-img' src='/AOI Image/images/{dataTranpose[sample][modelName]}' alt={modelName}/>
                            </div>
                        </td>
                    {/each}
                </tr>
                <tr>
                    {#each columnOrder as modelName, index}
                        <td>
                            {#if index > 1}
                                <div class='img-container'>
                                    <img class='base-img' src='/{modelName}/iou_plot/{dataTranpose[sample][modelName]}' alt={modelName}/>
                                </div>
                            <!-- {:else}
                                <div class='img-container'>
                                    <img class='base-img' src='/{modelName}/visualization/{dataTranpose[sample][modelName]}' alt={modelName}/>
                                </div> -->
                            {/if}
                        </td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>

</div>

<style>
.table-container {
    max-height: 400px;
    overflow: auto;
}

table {
    border-collapse: collapse;
    width: 100%;
}

th, td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: center;
}

/* Sticky Header */
thead th {
    position: sticky;
    top: 0; /* Sticks to the top */
    background-color: #f1f1f1;
    z-index: 2; /* Ensure header is above other elements */
}

/* Sticky Left Column */
thead th:first-child,
tbody td:first-child {
    position: sticky;
    left: 0; /* Sticks to the left */
    background-color: #f9f9f9;
    z-index: 1; /* Ensure sticky column is above other cells */
}

.img-container {
    position: relative;
    max-width: 30em;
    min-width: 20em;
}

.base-img {
    width: 100%;
    height: 100%;
    display: block;
}

.overlay-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0; /* Start with overlay invisible */
    transition: opacity 0.3s ease; /* Smooth transition */
}

.img-container:hover .overlay-img {
    opacity: 0.5;
}

</style>
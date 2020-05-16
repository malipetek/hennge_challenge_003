<style>
.main{
    display: flex;
    flex-wrap: wrap;
}
main>* {
    width: 100%;
    height: 100%;
}

.list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.vertical-center {
    justify-content: center;
}
</style>

<div class="main">
    <div class="list {emails.length ? '' : 'vertical-center'}">
        {#if emails.length} 
            <EmailListEmail bind:sortAscending on:sortChanged />
        {/if}
        {#each emails as email, i }
            
            <EmailListEmail {email} />
        {:else}
            <img src="assets/logo.png" alt="">
        {/each}
    </div>
</div>

<script>
    import EmailListEmail from './EmailListEmail.svelte';
    export let emails = [];
    export let sortAscending;
</script>
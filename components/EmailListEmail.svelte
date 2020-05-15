<style>
    .email{
        box-sizing: border-box;
        width: 100%;
        display: grid;
        padding: 10px 15px;
        border-style: solid;
        border-color: #ccc;
        border-width: 0 0 1px 0;
        
        grid-template-areas: 
            "from from from date"
            "to to to ."
            "subject subject subject subject";
        grid-template-columns: 2fr 2fr 2fr min-content;
        grid-gap: 3px;
    }
    
    .email>* {
        display: inline;
        text-align: left;
        font-size: .8em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-right: 10px;
    }
    .header {
        background-color: #ddd;
        border-width: 0 0 2px 0;
        display: flex;
        justify-content: flex-start;
    }
    .header .subject {
        font-size: .8em;
    }
    .header>*:after{
        content: '|';
        display: inline;
        margin-left: 5px;
    }
    .header>*:last-child:after{
        content: '';
    }
    .from {
        grid-area: from;
        font-weight: bold;
    }
    .to {
        grid-area: to;
    }
    .subject {
        grid-area: subject;
        font-size: 1em;
    }
    .date {
        grid-area: date;
    }
    @media (min-width: 640px) {
         .email{
            width: 100%;
            padding: 10px;
            border-style: solid;
            border-color: #ccc;
            border-width: 0 0 1px 0;
            
            display: grid;
            grid-template-areas: "from to subject date";
            grid-template-columns: 3fr 4fr 12fr 2fr;
        }
        .header {
            display: grid;
        }
        .header>*:after{
            display: none;
        }
        .from {
            grid-area: from;
            font-weight: normal;
        }
        .to {
            grid-area: to;
        }
        .subject {
            grid-area: subject;
            font-size: .8em;
        }
        .date {
            grid-area: date;
            font-weight: bold;
        }
    }
</style>
<div class="email {!email ? 'header' : ''}">
    <div class="from">
        {#if !email} <b> From </b> {:else} {email.from} {/if}
    </div>
    <div class="to">
        {#if !email} <b> To </b> {:else} {email.to} {/if}
    </div>
    <div class="subject">
        {#if !email} <b> Subject </b> {:else} {email.title} {/if}
    </div>
    <div class="date">
        {#if !email} <b> Date </b> {:else} {email.date} {/if}
    </div>
</div>
<script>
export let email;
</script>
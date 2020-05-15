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
            "icon from from from attachment date"
            "icon to to to to cc"
            "subject subject subject subject subject subject";
        grid-template-columns: 20px 2fr 2fr 2fr min-content;
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
    .header .icon-mail {
        display: none;
    }
    .attachment{
        grid-area: attachment;
    }
    .attachment>img {
        width: 12px;
    }
    .icon-mail {
        grid-area: icon;
        overflow: visible;
    }
    .icon-mail>img{
        width: 12px;
    }
    .from {
        grid-area: from;
        font-weight: bold;
    }
    .to {
        grid-area: to;
        position: relative;
    }
    .subject {
        grid-area: subject;
        font-size: 1em;
    }
    .date {
        grid-area: date;
    }
    .cc {
        grid-area: cc;
    }
    .span-cc{
        display: inline-block;
        background-color: #888;
        color: #fff;
        padding: 3px 5px;
        border-radius: 4px;
        float: right;
    }
    @media (min-width: 640px) {
         .email{
            width: 100%;
            padding: 10px;
            border-style: solid;
            border-color: #ccc;
            border-width: 0 0 1px 0;
            
            display: grid;
            grid-template-areas: "from to cc subject attachment date";
            grid-template-columns: 3fr 4fr 1fr 12fr 30px 2fr;
        }
        .header {
            display: grid;
        }
        .header>*:after{
            display: none;
        }
        .icon-mail {
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
<div class="email {!email ? 'header' : ''}" in:fly={{ x: -50, duration: 300 }} out:fly={{ x: 50, duration: 300 }}>
    <div class="icon-mail">
        <img src="assets/icon_mail_sp.svg" alt="mail icon">
    </div>
    <div class="from">
        {#if !email} <b> From </b> {:else} {email.from} {/if}
    </div>
    <div class="to">
        {#if !email} <b> To </b> {:else} {email.to} {/if}
    </div>
    <div class="cc">
        {#if email}
            {#if email.cc.length} <span class="span-cc">+{email.cc.length}</span>{/if} 
        {/if}
    </div>
    <div class="subject">
        {#if !email} <b> Subject </b> {:else} {email.title} {/if}
    </div>
    {#if email && email.attachment.length}
    <div class="attachment">
        <img src="assets/icon_clip.svg" alt="attachment icon">
    </div>
    {/if}
    <div class="date">
        {#if !email} <b> Date </b> {:else} {email.date} {/if}
    </div>
</div>
<script>
export let email;
import { fly } from 'svelte/transition';
</script>
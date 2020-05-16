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

        transition: box-shadow .3s ease-in-out;
    }
    .clickable{
        cursor: pointer;
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
    .header .from img {
        width: 10px;
        transform: rotateY(0deg);
    }
    .header .from span{
        display: inline-block;
        transform: rotateZ(0deg);
    }
    .header .from {
        overflow: visible;
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

    .open {
        background-color: #B3E5FC!important;
    }
    .email-content {
        box-shadow: 3px 3px 7px 5px #00000020;
    }
    
    .email-content {
        padding: 1em;
        border-style: solid;
        border-color: #ccc;
        border-width: 0 0 1px 0;
    }
    .email-body, .email-content {
        text-align: left;
        text-transform: capitalize;     
    }

    .flipY {
        transform: rotateZ(180deg)!important;
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

         .header .date img {
        width: 10px;
        transform: rotateY(0deg);
        }
        .header .date span{
            display: inline-block;
            transform: rotateZ(0deg);
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
<div class="email"
    class:header={!email}
    class:clickable={email}
    class:open={open}
    in:fly={{ x: -50, duration: 300 }} 
    out:fly={{ x: 50, duration: 300 }}
    on:click="{() => email ? open = !open : !1}"
    >
    <div class="icon-mail">
        <img src="assets/icon_mail_sp.svg" alt="mail icon">
    </div>
    <div class="from">
        {#if !email} 
        <b 
            on:click={() => isMobile ? changeSort() : ''}
            class:clickable={isMobile}
            > From 
            {#if isMobile } 
                <span class:flipY={sortAscending}>
                    <img src="assets/icon_arrow01.svg" />
                </span>
            {/if}
        </b> 
        {:else}
            {email.from}
        {/if}
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
        {#if !email} 
        <b 
            on:click={() => !isMobile ? changeSort() : ''}
            class:clickable={!isMobile}
            > Date
            {#if !isMobile } 
                <span class:flipY={sortAscending}>
                    <img src="assets/icon_arrow01.svg" />
                </span>
            {/if}
        </b> {:else} {dateFormatted} {/if}
    </div>
</div>
<div>
{#if open}
<div class="email-content"
    transition:slide
    >
    <div class="email-description">
        <p><b> From: </b> {email.from}</p>
        <p><b> To: </b> {email.to}</p>
        {#if email.cc && email.cc.length}<p><b> Cc: </b> {email.cc.join(', ')}</p>{/if}
        {#if email.attachment && email.attachment.length }<p><b> Attachments: </b> {email.attachment}</p>{/if}
    </div>
    <p class="email-body">
        { email.body }
    </p>
</div>
{/if}
</div>
<svelte:window bind:innerWidth={width}/>
<script>
export let open = false;
export let email;
export let sortAscending;

import { fly, slide, fade } from 'svelte/transition';
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

let width;
$: isMobile = width < 640;

const changeSort = () => {
    sortAscending = !sortAscending;
    dispatch('sortChanged');
    }

import moment from 'moment';
let dateFormatted;


$: if(email && email.date) {
    dateFormatted = moment(email.date).calendar(null, {
                                                    sameDay: 'LT',
                                                    lastDay: 'MMMM DD',
                                                    lastWeek: 'MMMM DD',
                                                    lastMonth: 'DD MM',
                                                    sameElse: 'DD/MM/YYYY'
                                                });
    //dateFormatted = dateFormatted.hours() < 24 ? dateFormatted.hours() : dateFormatted;
}
</script>
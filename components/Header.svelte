
<style>
  header {
    box-sizing: border-box;
    width: 100%;
    padding: 20px 15px;
    display: flex;
    justify-content: space-between;
  }
  .fs-15 {
    font-size: 1.5em;
  }
  .lh-20 {
    line-height: 2;
    vertical-align: bottom;
  }
  .bb-1-g {
    border-bottom: 2px solid #ccc;
  }

  .flx {
    display: flex;
  }
  .hl {
    justify-content: flex-start;
  }
  .result-indicator{
      padding: 0 15px;
  }
</style>

<header>
  <div class="datepicker-container">
    <Datepicker 
      on:rangeSelected 
      bind:dateChosenStart={dateChosenStart} 
      bind:dateChosenEnd={dateChosenEnd} 
      bind:formattedSelected={formattedSelected} 
      bind:formattedSelectedEnd={formattedSelectedEnd} 
      buttonBorderColor="#E0E0E0" 
      rangePicker
      start={minDate}
      end={maxDate}
      />
  </div>
  <div />
</header>
<div class="result-indicator bb-1-g">
  <span class="flx hl">
    <span class="lh-20">Results:</span>
    &nbsp;
    <span class="fs-15">{emails.length}</span>
    <span class="lh-20">mail{emails.length > 1 ? 's' : ''}</span>
  </span>
</div>
<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  
  export let emails;
  export let date;
  export let user;
  export let formattedSelected;
  export let formattedSelectedEnd;

  export let dateChosenStart;
  export let dateChosenEnd;
  
  let dateSelectedCallback = () => {
    dispatch('rangeSelected', {formattedSelected, formattedSelectedEnd});
  };

  import Datepicker from "./svelte-calendar/Datepicker.svelte";
  export let minDate;
  export let maxDate;

</script>

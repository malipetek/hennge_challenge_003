
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
    <Datepicker buttonBorderColor="#E0E0E0" rangePicker start={mindate} end={maxdate} />
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
  export let emails;
  export let date;
  export let user;
  const dayAsMs = 864e5;
  const allowedArchiveCallback = 90 * dayAsMs; // 90 days
  import Datepicker from "./svelte-calendar/Datepicker.svelte";

  let mindate = new Date();
  mindate.setTime(new Date().getTime() - allowedArchiveCallback);
  let maxdate = new Date();

</script>

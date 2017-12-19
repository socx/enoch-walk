import { Directive, ElementRef, ContentChild, Output, EventEmitter, Input} from "@angular/core";
import { DropdownNotClosableZoneDirective} from "./dropdown-not-closable-zone.directive";

@Directive({
  selector: "[dropdown]",
  exportAs: "dropdown"
})
export class DropdownDirective {
  
      // -------------------------------------------------------------------------
      // Inputs / Outputs
      // -------------------------------------------------------------------------
  
      @Input("dropdownToggle")
      toggleClick = true;
  
      @Input("dropdownFocusActivate")
      activateOnFocus = false;
  
      @Output()
      onOpen = new EventEmitter();
  
      @Output()
      onClose = new EventEmitter();
  
      // -------------------------------------------------------------------------
      // Properties
      // -------------------------------------------------------------------------
  
      @ContentChild(DropdownNotClosableZoneDirective)
      notClosableZone: DropdownNotClosableZoneDirective;
  
      // -------------------------------------------------------------------------
      // Constructor
      // -------------------------------------------------------------------------
  
      constructor(private elementRef: ElementRef) {
      }
  
      // -------------------------------------------------------------------------
      // Public Methods
      // -------------------------------------------------------------------------
  
      open() {
          const element: HTMLElement = this.elementRef.nativeElement;
          element.classList.add("open");
          this.onOpen.emit(element);
      }
  
      close() {
          const element: HTMLElement = this.elementRef.nativeElement;
          element.classList.remove("open");
          this.onClose.emit(undefined);
      }
  
      isOpened() {
          const element: HTMLElement = this.elementRef.nativeElement;
          return element.classList.contains("open");
      }
  
      isInClosableZone(element: HTMLElement) {
          if (!this.notClosableZone)
              return false;
  
          return this.notClosableZone.contains(element);
      }
  
  }
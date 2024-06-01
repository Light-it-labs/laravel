<?php

declare(strict_types=1);

namespace Lightit\Shared\App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class GenerateFrontendComponent extends Command
{
    /**
     * @var string
     */
    protected $signature = 'make:component {name}';

    /**
     * @var string
     */
    protected $description = 'Generates a React component for the chosen domain.';

    public function handle(): void
    {
        $name = $this->argument('name');
        
        if (! ctype_upper($name[0])) {
            $this->error("The component name must start with a capital letter.");
            return;
        }
        
        // List existing directories inside resources/js
        $resourcesJsDir = resource_path('js');
        $domainFolders = array_filter(glob($resourcesJsDir . '/*'), 'is_dir');

        if (empty($domainFolders)) {
            $this->error("No directories found inside resources/js");
            return;
        }
        
        $domainNames = array_map(function ($dir) use ($resourcesJsDir) {
            return str_replace($resourcesJsDir . '/', '', $dir);
        }, $domainFolders);
        
        $chosenDomain = $this->choice('Choose a directory to create the component in', $domainNames);
        
        $componentDir = $resourcesJsDir . '/' . $chosenDomain . '/components';
        
        if (! File::exists($componentDir)) {
            File::makeDirectory($componentDir, 0755, true);
        }
        
        $componentPath = $componentDir . "/{$name}.tsx";
        
        if (File::exists($componentPath)) {
            $this->error("Component {$name}.tsx already exists in {$chosenDomain}!");
            return;
        }
        
        $stubPath = base_path('stubs/react-component.stub');
        $componentTemplate = $this->getComponentTemplate($stubPath, $name);

        File::put($componentPath, $componentTemplate);

        $this->info("Component {$name}.tsx created successfully in {$chosenDomain}.");
    }
    
    protected function getComponentTemplate($stubPath, $name)
    {
        $template = File::get($stubPath);

        return str_replace(
            ['{{ name }}'],
            [$name],
            $template
        );
    }
}
